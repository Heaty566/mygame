import * as React from "react";

export interface PasswordFieldProps {
        label: string;
        name: string;
        register;
}

const eyeIcon = (isMask: boolean, setIsMask: Function) => {
        return (
                <div className="cursor-pointer">
                        {isMask ? (
                                <svg
                                        onClick={() => setIsMask(!isMask)}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                        <path
                                                d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z"
                                                stroke="#3F3F46"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                        />
                                        <path
                                                d="M2.45801 12C3.73201 7.943 7.52301 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.52301 19 3.73201 16.057 2.45801 12Z"
                                                stroke="#3F3F46"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                        />
                                </svg>
                        ) : (
                                <svg
                                        onClick={() => setIsMask(!isMask)}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                        <path
                                                d="M13.875 18.825C13.2569 18.9419 12.6291 19.0005 12 19C7.52203 19 3.73203 16.057 2.45703 12C2.8003 10.9081 3.32902 9.88346 4.02003 8.971M9.87803 9.879C10.4407 9.31634 11.2038 9.00025 11.9995 9.00025C12.7952 9.00025 13.5584 9.31634 14.121 9.879C14.6837 10.4417 14.9998 11.2048 14.9998 12.0005C14.9998 12.7962 14.6837 13.5593 14.121 14.122M9.87803 9.879L14.121 14.122M9.87803 9.879L14.12 14.12M14.121 14.122L17.412 17.412M9.88003 9.88L6.59003 6.59M6.59003 6.59L3.00003 3M6.59003 6.59C8.20239 5.54957 10.0811 4.9974 12 5C16.478 5 20.268 7.943 21.543 12C20.8391 14.2305 19.3774 16.1446 17.411 17.411M6.59003 6.59L17.411 17.411M17.411 17.411L21 21"
                                                stroke="#3F3F46"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                        />
                                </svg>
                        )}
                </div>
        );
};

const PasswordField: React.FunctionComponent<PasswordFieldProps> = ({ label, name, register }) => {
        const [isMask, setIsMask] = React.useState<boolean>(true);

        return (
                <div className="flex flex-col mb-4 w-full">
                        <label htmlFor={name} className="text-white text-base font-semibold cursor-pointer">
                                {label}
                        </label>
                        <div className="w-full bg-white rounded-sm px-2 text-sm text-black py-1 flex justify-between items-center">
                                <input
                                        id={name}
                                        name={name}
                                        ref={register}
                                        type={isMask ? "password" : "text"}
                                        className="w-full h-full outline-none bg-white"
                                        autoComplete="off"
                                />
                                {eyeIcon(isMask, setIsMask)}
                        </div>
                </div>
        );
};

export default PasswordField;
