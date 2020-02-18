import React from "react";
import { Wrapper, Notification } from "./notification-bar.styled";
import { ReviewStatus } from "utils/types";

interface Props {
  status: ReviewStatus;
  numberOfNotifications: number;
}

export const NotificationBar: React.FC<Props> = ({
  status,
  numberOfNotifications
}) => {
  return (
    <Wrapper>
      <Notification status={status}>{numberOfNotifications}</Notification>
    </Wrapper>
  );
};
