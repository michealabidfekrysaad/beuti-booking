import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./ServiceSlider.scss";
import { useState } from "react";

export default function ServiceSlider({ categories, handleChange, value }) {
  return (
    <section className="serviceslider">
      <Tabs
        style={{ height: 25 }}
        value={value}
        onChange={(e, newValue) => handleChange(e, newValue)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {categories?.map((cate, index) => (
          <Tab label={cate} key={index} />
        ))}
      </Tabs>
    </section>
  );
}
