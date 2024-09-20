import {useState, ChangeEvent} from "react";

export default (initValue: string = '') : [string, (e: ChangeEvent<HTMLInputElement>) => void]  => {
    const [value, setValue] = useState(initValue);
    const handler = (e: ChangeEvent<HTMLInputElement>) : void => setValue(e.target.value);

    return [value, handler];
}
