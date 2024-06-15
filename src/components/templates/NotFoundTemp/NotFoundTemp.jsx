import React from "react";
import { useIntl } from "react-intl";
import "./NotFoundTemp.scss";

export default function NotFoundTemp() {
  const { messages } = useIntl();

  return (
    <section className="not-found">
      <img alt="notFound" src="/Images/notFound.png" />
      <div className="not-found__hint">
        <p>{messages["not.found.title"]}</p>
        <p>{messages["not.found.sub.title"]}</p>
      </div>
    </section>
  );
}
