import React from "react";
import { render, screen } from "@testing-library/react";
import { LineStockChart } from "./index";

describe("<LineStockChart />", () => {
  it("should render without crashing", () => {
    const data = {
      date: "",
      price: 1,
      stockName: "TestName",
    };
    render(
      <LineStockChart
        date={data.date}
        price={data.price}
        stockName={data.stockName}
      />
    );
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });
});
