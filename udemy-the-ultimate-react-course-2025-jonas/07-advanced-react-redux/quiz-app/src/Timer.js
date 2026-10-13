import { useEffect } from "react"

export default function Timer({dispatch, remaining_s}) {

    const minutes = Math.floor(remaining_s / 60);
    const seconds = remaining_s % 60;

    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'timer_s'})
        }, 1000);

        console.log('timer set', id);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <p className="timer">{formatNumber(minutes)}:{formatNumber(seconds)} remaining</p>
    )
}