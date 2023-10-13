import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
export const MSwitch = (props: any) => {
    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch(props);

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            "w-8 h-8",
                            "flex items-center justify-center",
                            "rounded-lg bg-default-100 hover:bg-default-200",
                        ],
                    })}
                >
                    {isSelected ? <h3 className=" text-primary font-bold">
                        Watching Dub
                    </h3> : <h3 className=" text-primary font-bold">
                        Watching Sub
                    </h3>}
                </div>
            </Component>
        </div>
    )
}