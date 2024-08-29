'use client';

import SettingNav from "./setting-nav";
import SettingMain from "./setting-main";
import { useState } from "react";

export default function Settings() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <div>
            <SettingNav />
            <SettingMain>

            </SettingMain>
        </div>
    )
}