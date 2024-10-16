import { Provider } from "react-redux"
import { store } from "../Store"

/**
 * StoreProvider component wraps its children with a Redux Provider
 * to make the Redux store available to the entire component tree.
 *
 * @param {Object} props - React props object.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 */
const StoreProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
export default StoreProvider
