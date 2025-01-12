import classNames from "classnames";
import { memo, ReactNode } from "react";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
  shouldCloseOnOverlayClick?: boolean;
}

const BaseModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    children,
    width = 400,
    shouldCloseOnOverlayClick = true,
  } = props;
  return (
    <ReactModal
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      bodyOpenClassName="overflow-hidden"
    >
      <div className="modal-container w-full md:w-auto flex justify-center items-center absolute bottom-0 md:bottom-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:translate-y-1/2">
        <div
          style={{ width: `${width}px` }}
          className={classNames(
            "bg-white rounded-lg shadow-lg w-full max-w-lg",
            "md-auto"
          )}
        >
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

export default memo(BaseModal);
