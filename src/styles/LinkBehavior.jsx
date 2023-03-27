import { forwardRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import PropTypes from "prop-types"

const LinkBehavior = forwardRef((props, ref) => {
    const { href, ...other } = props
    return (
        <RouterLink
            ref={ref}
            to={href}
            {...other}
        />
    )
})
LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
        PropTypes.shape({
            hash: PropTypes.string,
            pathname: PropTypes.string,
            search: PropTypes.string,
        }),
        PropTypes.string,
    ]).isRequired,
}
export default LinkBehavior