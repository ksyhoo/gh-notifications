import React from "react";
import { Wrapper, Notification } from "./notification-bar.styled";
import { ReviewStatus } from "utils/types";

interface Props {
  status: ReviewStatus;
}

export const NotificationBar: React.FC<Props> = ({ status }) => {
  return (
    <Wrapper>
      <Notification status={status}>1</Notification>
    </Wrapper>
  );
};
