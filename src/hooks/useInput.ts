/* eslint-disable */
import {useState, ChangeEvent, useEffect, useRef} from "react";

export default (initValue: string = '') : [string, (e: ChangeEvent<HTMLInputElement>) => void]  => {
    const [value, setValue] = useState(initValue);
    // const renderCount = useRef(0);

    // debounce practice realization
    // function debounce (f: (o: string) => void, ms: number) {
    //     let timer: ReturnType<typeof setTimeout>;
    //     return function() {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             return f.apply(null, arguments);
    //         }, ms);
    //     }
    // }
    // const fetchFunc = (o: string) : void => console.log(o, 'useInput.ts', 13);

    // const debounceRef = useRef(debounce(fetchFunc, 1000))

    // useEffect(() => {
    //     renderCount.current = renderCount.current + 1;
    // });
    const handler = (e: ChangeEvent<HTMLInputElement>) : void => {
        setValue(e.target.value);
        // if(renderCount.current > 1) debounceRef.current(e.target.value);
    };

    return [value, handler];
}