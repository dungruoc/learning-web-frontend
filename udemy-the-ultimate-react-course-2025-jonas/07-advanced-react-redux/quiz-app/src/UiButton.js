import { useQuiz } from "./QuizContext";

export default function UiButton({children, action}) {
    const {dispatch} = useQuiz();
    
    return (
        <button className="btn btn-ui"
            onClick={() => dispatch({type: action})}>
            {children}
        </button>
    );
}