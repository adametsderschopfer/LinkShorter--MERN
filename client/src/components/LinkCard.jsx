import React from "react";

const LinkCard = ({ link }) => {
  console.log(link);

  return (
    <React.Fragment>
      <h2>Ссылка</h2>

      <p>
        Ваша ссылка:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          &nbsp;{link.to}
        </a>
      </p>

      <p>
        Откуда:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          &nbsp;{link.from}
        </a>
      </p>

      <p>
        Кол-во кликов по ссылке: &nbsp;<b>{link.clicks}</b>
      </p>

      <p>
        Дата создания: &nbsp;
        <b>{new Date(link.date).toLocaleDateString()}</b>
      </p>
    </React.Fragment>
  );
};

export { LinkCard };
