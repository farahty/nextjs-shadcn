import { Html, Body } from "@react-email/components";
import { FC } from "react";

export type DefaultTemplateProps = {
  text: string;
};

export const DefaultTemplate: FC<Readonly<DefaultTemplateProps>> = ({
  text,
}) => {
  return (
    <Html>
      <Body>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </Body>
    </Html>
  );
};
