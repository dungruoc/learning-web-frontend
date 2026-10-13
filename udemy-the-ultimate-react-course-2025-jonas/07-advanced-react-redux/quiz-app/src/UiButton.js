export default function UiButton({children, dispatch, action}) {
    return (
        <button className="btn btn-ui"
            onClick={() => dispatch({type: action})}>
            {children}
        </button>
    );
}