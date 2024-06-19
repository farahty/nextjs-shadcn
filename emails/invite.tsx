import { Html, Body, Head, Font, Tailwind } from "@react-email/components";
import { FC } from "react";

export type InviteTemplateProps = {
  text: string;
};

export const InviteTemplate: FC<Readonly<InviteTemplateProps>> = ({ text }) => {
  return (
    <Html>
      <Head>
        <title>نمر فراحتي</title>

        <Font
          fontFamily="Cairo"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvangtZmpQdkhzfH5lkSscQyyS8p4_RHH1.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Body>
        <Tailwind>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Tailwind>
      </Body>
    </Html>
  );
};
