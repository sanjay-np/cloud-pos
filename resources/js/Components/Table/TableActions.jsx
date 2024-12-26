import { FilePenLineIcon, ListIcon, Trash2Icon } from "lucide-react"
import { IconButton } from "rsuite"

/**
 * ViewActionButton component renders an IconButton with a ListIcon.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.action - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered IconButton component.
 */
export const ViewActionButton = (props) => {
    return (
        <IconButton
            appearance="subtle"
            size='xs'
            icon={<ListIcon size={18} />}
            onClick={props?.action}
        />
    )
}


/**
 * EditActionButton component renders a subtle, extra small IconButton with a file with pen icon.
 * When clicked, it triggers the action passed via props.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.action - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered IconButton component.
 */
export const EditActionButton = (props) => {
    return (
        <IconButton
            appearance="subtle"
            size='xs'
            icon={<FilePenLineIcon size={18} />}
            onClick={props?.action}
        />
    )
}

/**
 * DeleteActionButton component renders a subtle, extra small IconButton with a trash icon.
 * When clicked, it triggers the action passed via props.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.action - The function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered IconButton component.
 */
export const DeleteActionButton = (props) => {
    return (
        <IconButton
            appearance="subtle"
            size='xs'
            icon={<Trash2Icon size={1} />}
            onClick={props?.action}
        />
    )
}