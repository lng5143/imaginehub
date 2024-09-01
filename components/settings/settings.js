'use client';

import SettingNav from "./setting-nav";
import SettingMain from "./setting-main";
import SettingCategory from "./setting-category";
import ModelsSetting from "./models-setting";
import AppearanceSetting from "./appearance-setting";
import { useState } from "react";

export default function Settings() {
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
    }

    return (
        <div className="flex h-full">
            <SettingNav>
                <ul>
                    <li key={1}>
                        <SettingCategory id={1} name="Models" onClick={(id) => handleCategoryClick(id)} />
                    </li>
                    <li key={2}>
                        <SettingCategory id={2} name="Appearance" onClick={(id) => handleCategoryClick(id)} />
                    </li>
                </ul>
            </SettingNav>
            <SettingMain>
                {selectedCategory === 1 ? <ModelsSetting /> : <AppearanceSetting />}
            </SettingMain>
        </div>
    )
}