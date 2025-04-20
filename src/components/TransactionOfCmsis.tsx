import { Box, Typography } from "@mui/material";
import React from "react";
import { DATA_HOST } from "../utils/constant";
import { convertStringToTime, timeFromNow } from "../utils/helper";
const TransactionOfCmsis: React.FC<{ stock: string; configID: number }> = ({
  stock,
  configID,
}) => {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://cafef.vn/du-lieu/Ajax/NewsBySymbol.aspx?symbol=${stock}&configID=${configID}&PageIndex=1&PageSize=9&Type=1`,
    )
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const listItems = Array.from(doc.querySelectorAll("li"));
        setData(
          listItems.map((li) => ({
            href: li.querySelector("a")?.href,
            text: li?.textContent,
            time: convertStringToTime(
              li?.textContent.split("(").slice(-1)[0].split(")")[0],
            ),
          })),
        );
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [stock]);

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        overflowY: "auto",
      }}
    >
      {data.map((item: any, index) => (
        <Box
          key={item.href}
          title={item.text}
          onClick={() =>
            window.open(
              `${DATA_HOST}/du-lieu/${item.href.split("/du-lieu/")[1]}`,
              "_blank",
            )
          }
          sx={{
            color: item.text?.includes("bán")
              ? "rgb(220, 0, 0, 0.7)"
              : item.text?.includes("mua")
                ? "rgba(0,128,0,0.8)"
                : "grey",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "380px",
            padding: "5px 5px",
            borderBottom:
              index === data.length - 1 ? undefined : "1px solid #ddd",
          }}
        >
          <Typography sx={{ fontSize: "0.7rem" }}>
            {item.time &&
              `${item.time?.toLocaleDateString()} - ${timeFromNow(item.time)}`}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem" }}>
            {item.text.split(":")[1].split("(")[0]}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default TransactionOfCmsis;
