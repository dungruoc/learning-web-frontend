import { useQuiz } from "./QuizContext";
import UiButton from "./UiButton";

export default function FinishScreen() {
    const {scores, maxScores,  highestScore} = useQuiz();

    const pct = 100 * scores / maxScores;

    const emoj = (
        pct > 95 ? '💎' :
        pct >= 80 ? '🏆' :
        pct >= 50 ? '🙃' :
        pct >= 20 ? '🥹' :
        '😭'
    );

    return (
        <>
            <p className="result">
                <span>{emoj}</span> Your scored <strong>{scores}</strong> out of {maxScores} ({Math.ceil(pct)}%)
            </p>
            <p className="highscore">Highest score: {highestScore}</p>
            <UiButton action={'start'}>
                Restart Quiz
            </UiButton>
        </>
    )
}