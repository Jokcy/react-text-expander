import { useRef, type RefObject, useTransition } from "react";

type TextExpanderProps = {
    renderInput: (
        ref: RefObject<HTMLTextAreaElement | HTMLInputElement>
    ) => JSX.Element;
    keys: string[];
};

/**
 * <TextExpander renderInput={(ref) => <Input ref={ref}></Input>}></TextExpander>
 * @param param0
 * @returns
 */
export const TextExpander = function TextExpander({
    renderInput,
    keys,
}: TextExpanderProps) {
    const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    return (
        <div
            style={{
                position: "relative",
            }}
        >
            {renderInput(ref)}
        </div>
    );
};
