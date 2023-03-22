import {
    useCallback,
    useMemo,
    useRef,
    KeyboardEvent,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import { updateMirrorStyle } from "./mirror-style";
import { getWordBefore } from "./utils";

/**
 * @asd I said some
 * @param keys
 * @returns
 */
export function useTextExpander<
    E extends HTMLTextAreaElement | HTMLInputElement
>(keys: string[], updateValue: Dispatch<SetStateAction<string>>) {
    const ref = useRef<E>(null);
    const [expanderKey, setExpanderKey] = useState<string | null>(null);
    const [expanderValue, setExpanderValue] = useState<string | null>(null);
    const [position, setPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    // <div><span>cursor before</span><span>{' '}</span><span>cursor after</span></div>
    const mirrorDiv = useMemo(() => {
        if (typeof window === "undefined") return null;
        const div = document.createElement("div");

        div.style.position = "fixed";
        div.style.left = "-20000px";

        document.body.appendChild(div);

        return div;
    }, []);

    const updateMirrorDivContent = useCallback(
        (
            value: string,
            position: number,
            input: HTMLTextAreaElement | HTMLInputElement
        ) => {
            if (!mirrorDiv) return;

            const beforText = value.substring(0, position);
            const afterText = value.substring(position);

            mirrorDiv.innerHTML = "";

            const beforeSpan = document.createElement("span");

            const targetSpan = document.createElement("span");
            targetSpan.innerText = "&nbsp;";

            beforeSpan.innerText = beforText;

            mirrorDiv.appendChild(beforeSpan);
            mirrorDiv.appendChild(targetSpan);

            if (afterText) {
                const afterSpan = document.createElement("span");
                afterSpan.innerText = afterText;
                mirrorDiv.appendChild(afterSpan);
            }

            const inputStyle = window.getComputedStyle(input);

            updateMirrorStyle(mirrorDiv, inputStyle);

            const targetRect = targetSpan.getBoundingClientRect();
            const mirrorRect = mirrorDiv.getBoundingClientRect();

            setPosition({
                top: targetRect.top - mirrorRect.top + targetRect.height,
                left: targetRect.left - mirrorRect.left,
            });
        },
        [mirrorDiv]
    );

    const doUpdate = useCallback(() => {
        if (ref.current) {
            const { value, selectionStart, selectionEnd } = ref.current;

            if (selectionStart) {
                const expaner = getWordBefore(value, selectionStart, keys);
                if (expaner) {
                    setExpanderKey(expaner.divider);
                    setExpanderValue(expaner.word);
                    updateMirrorDivContent(
                        value,
                        expaner.dividerIndex,
                        ref.current
                    );
                } else {
                    setExpanderKey(null);
                    setExpanderValue(null);
                }
            } else {
                setExpanderKey(null);
                setExpanderValue(null);
            }
        }
    }, [keys, updateMirrorDivContent]);

    const onKeyUp = doUpdate;

    const onClick = doUpdate;

    const onBlur = useCallback(() => {
        setExpanderKey(null);
        setExpanderValue(null);
    }, []);

    const insert = useCallback(
        (text: string) => {
            if (ref.current) {
                ref.current.value = ref.current.value + text + " ";
                updateValue(ref.current.value);
                doUpdate();
            }
        },
        [updateValue, doUpdate]
    );

    return {
        ref,
        events: {
            onKeyUp,
            onClick,
            // onBlur,
        },
        expanderKey,
        expanderValue,
        position,
        insert,
    };
}
