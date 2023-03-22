import { useTextExpander } from "@/src/useTextExpander";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

import classes from "./index.module.css";

const ids = ["Jokcy", "Lou", "Amber", "Lily", "Dan", "James"];

export default function Home() {
    const [value, setValue] = useState("");

    const { ref, events, expanderKey, expanderValue, position, insert } =
        useTextExpander<HTMLTextAreaElement>(["@"], setValue);

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }, []);

    const filtedList = useMemo(() => {
        return expanderValue
            ? ids.filter(
                  (id, index) =>
                      id.toLowerCase().includes(expanderValue.toLowerCase()) &&
                      index < 5
              )
            : ids;
    }, [expanderValue]);

    return (
        <div className={classes.wrapper}>
            <div
                className={classes.editorContainer}
                style={{
                    position: "relative",
                }}
            >
                <ul
                    style={{
                        position: "absolute",
                        top: position ? position.top : 0,
                        left: position ? position.left : 0,
                        width: "160px",
                        borderRadius: "10px",
                        maxHeight: "200px",
                        overflowY: "hidden",
                        background: "#181818",
                        display: expanderKey ? "flex" : "none",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "flex-start",
                        listStyle: "none",
                        padding: 0,
                    }}
                >
                    {filtedList.map((id) => (
                        <li
                            key={id}
                            className={classes.listItem}
                            onClick={() => insert(id)}
                        >
                            {id}
                        </li>
                    ))}
                </ul>
                <textarea
                    ref={ref}
                    onChange={handleChange}
                    {...events}
                    rows={10}
                    value={value}
                    className={classes.textArea}
                    id="demo"
                ></textarea>
            </div>
        </div>
    );
}
