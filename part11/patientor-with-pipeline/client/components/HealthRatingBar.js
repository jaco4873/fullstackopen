import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
const StyledRating = styled(Rating)({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    }
});
const HEALTHBAR_TEXTS = [
    "The patient is in great shape",
    "The patient has a low risk of getting sick",
    "The patient has a high risk of getting sick",
    "The patient has a diagnosed condition",
];
const HealthRatingBar = ({ rating, showText }) => {
    return (_jsxs("div", { className: "health-bar", children: [_jsx(StyledRating, { readOnly: true, value: 4 - rating, max: 4, icon: _jsx(Favorite, { fontSize: "inherit" }) }), showText ? _jsx("p", { children: HEALTHBAR_TEXTS[rating] }) : null] }));
};
export default HealthRatingBar;
