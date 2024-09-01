'use client';

import SettingNav from "./setting-nav";
import SettingMain from "./setting-main";
import SettingCategory from "./setting-category";
import ModelsSetting from "./models-setting";
import GeneralSetting from "./general-setting";
import { useState } from "react";

export default function Settings() {
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleCategoryClick = (id) => {
        if (id === 1 || id === 2) {
            setSelectedCategory(id);
        } else {
            console.error('Invalid category ID:', id);
        }
    }

    return (
        <div className="flex h-full p-5">
            <SettingNav>
                <ul>
                    <li key={1}>
                        <SettingCategory id={1} name="General" onClick={(id) => handleCategoryClick(id)} />
                    </li>
                    <li key={2}>
                        <SettingCategory id={2} name="Models" onClick={(id) => handleCategoryClick(id)} />
                    </li>
                </ul>
            </SettingNav>
            <SettingMain>
                {selectedCategory === 1 ? <GeneralSetting /> : <ModelsSetting />}
            </SettingMain>
        </div>
    )
}