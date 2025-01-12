import { ApexOptions } from "apexcharts";
import { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartColors } from "../../constants";
import toast from "react-hot-toast";
import { apiGetArticle } from "../../services/ArticleService";
import { ArticleType } from "../../types/ArticleTypes";
import LoadingCover from "./LoadingCover";

const initCommentsChart: ApexOptions = {
  series: [
    {
      name: "Comments",
      data: [0, 0, 0, 0, 0],
    },
  ],
  chart: {
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [],
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val) => `${val}`,
    },
    marker: {
      show: true,
    },
  },
  colors: ChartColors,
};

const initCategoriesChart: ApexOptions = {
  series: [],
  chart: {
    type: "donut",
    height: 380,
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: "100%",
          height: "100%",
        },
        legend: {
          show: true,
          position: "bottom",
        },
      },
    },
  ],
  colors: ChartColors,
  tooltip: {
    enabled: true,
    y: {
      formatter: (val) => `${val} articles`,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (_, opts) => {
      const total = opts.w.config.series[opts.seriesIndex];
      return total;
    },
  },
};

const DashboardChart = () => {
  const [commentsChart, setCommentsChart] =
    useState<ApexOptions>(initCommentsChart);
  const [categoriesChart, setCategoriesChart] =
    useState<ApexOptions>(initCategoriesChart);

  const [loading, setLoading] = useState<boolean>(true);

  const countAndSortByCategory = (data: ArticleType[]) => {
    interface SortedArrType {
      category_title: string;
      total_article: number;
    }

    const categoryCount: Record<
      number,
      { category_title: string; total_article: number }
    > = data.reduce((acc, item) => {
      const categoryId = item?.category?.id || 0;
      const categoryTitle = item?.category?.name;

      if (!acc[categoryId]) {
        acc[categoryId] = { category_title: categoryTitle, total_article: 0 };
      }

      acc[categoryId].total_article += 1;
      return acc;
    }, {} as Record<number, { category_title: string; total_article: number }>);

    const sortedCategories = Object.values(categoryCount)
      .sort((a, b) => b.total_article - a.total_article)
      .filter((item: SortedArrType) => item?.category_title)
      .slice(0, 5);

    return sortedCategories;
  };

  const prepareData = async () => {
    try {
      const resp = await apiGetArticle({ page: 1, pageSize: 100 });
      const { data } = resp;
      const sortedByComments = data
        ?.sort(
          (a: ArticleType, b: ArticleType) =>
            b.comments.length - a.comments.length
        )
        .slice(0, 5);

      const _commentsChart = {
        ...commentsChart,
        series: [
          {
            data: sortedByComments.map(
              (item: ArticleType) => item?.comments?.length || 0
            ),
          },
        ],
        xaxis: {
          categories: sortedByComments.map((item: ArticleType) => item?.title),
          labels: {
            style: {
              fontSize: "8px",
            },
          },
        },
      };
      setCommentsChart(_commentsChart);

      const totalArticleByCategories = countAndSortByCategory(data);
      setCategoriesChart({
        ...categoriesChart,
        series: totalArticleByCategories?.map((item) => item?.total_article),
        labels: totalArticleByCategories?.map((item) => item?.category_title),
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error fetching charts data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <div className="relative">
      <LoadingCover loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="bg-white rounded-xl px-3 py-5"
            id="commentChart"
          >
            <h3 className="font-semibold text-lg pl-3">
              Article with most comments
            </h3>
            <ReactApexChart
              options={commentsChart}
              series={commentsChart.series}
              type="bar"
              height={350}
            />
          </div>
          <div
            className="bg-white rounded-xl px-3 py-5"
            id="categoryChart"
          >
            <h3 className="font-semibold text-lg pl-3">
              Total articles by categories
            </h3>
            <ReactApexChart
              options={categoriesChart}
              series={categoriesChart.series}
              type="donut"
              height={350}
            />
          </div>
        </div>
      </LoadingCover>
    </div>
  );
};

export default memo(DashboardChart);
