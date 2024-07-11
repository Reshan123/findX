import { Avatar, Container, Divider, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useUserContext } from '../../context/UserContext';

import BgPatternCard from "./bg-pattern-card.svg";
import avatarPath from "./profile-image.jpeg";

const ProfileCard = (props) => {
    const { user } = useUserContext();
    const appTheme = useTheme();

    const isXs = useMediaQuery(appTheme.breakpoints.down('xs'));
    const isSm = useMediaQuery(appTheme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(appTheme.breakpoints.up('lg'));

    const customColors = {
        darkCyan: "hsl(185, 75%, 39%)",
        veryDarkDesaturatedBlue: "hsl(229, 23%, 23%)",
        darkGrayishBlue: "hsl(227, 10%, 46%)",
        darkGray: "hsl(0, 0%, 59%)"
    };

    const sxCardStack = {
        height: "70%",
        width: "100%",
        // maxWidth: "20rem",
        // maxHeight: "25rem",
        borderRadius: ".4rem",
        // bgcolor: "white",
        overflow: "hidden",
        boxShadow: "0px 2px 10px rgb(0, 0, 0, 0.1)"
    };

    const avatarSize = isXs ? '4rem' : isSm ? '5rem' : isLg ? '7rem' : '7rem';

    const sxProfileStack = {
        width: "100%",
        height: "80%",
        position: "relative",
        alignItems: "center",
        "& > img": {
            width: "100%",
            height: "50%",
            overflow: "hidden",
            marginBottom: "4.5rem"
        },
        "& .MuiAvatar-root": {
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "45%",
            width: avatarSize,
            height: avatarSize,
            border: "1px solid",
            borderRadius: "50%",
            // borderColor: "white",
            borderWidth: "0.3rem"
        }
    };

    const sxProfileTextStack = {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "0.5rem"
    };

    const sxStatsStack = {
        width: "100%",
        height: "20%",
        px: "2rem",
        py: "0.8rem",
        flexDirection: "row",
        justifyContent: "space-between"
    };

    const sxStatsComponent = {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    };

    const sxTypographyName = {
        fontWeight: "700",
        // fontFamily: "Kumbh Sans",
        // color: customColors.veryDarkDesaturatedBlue,
        fontSize: "1.2rem"
    };

    const sxTypographyAge = {
        fontWeight: "400",
        // fontFamily: "Kumbh Sans",
        // color: customColors.darkGrayishBlue,
        fontSize: "1rem",
    };

    const sxTypographyLocation = {
        fontWeight: "400",
        // fontFamily: "Kumbh Sans",
        // color: customColors.darkGrayishBlue,
        fontSize: ".8rem",
        marginBottom: "1.5rem"
    };

    const sxTypographyStats = {
        // fontFamily: "Kumbh Sans",
        fontWeight: "700",
        // color: customColors.veryDarkDesaturatedBlue,
        fontSize: "1.2rem",
        textAlign: "center",
        textTransform: "uppercase"
    };

    const sxTypographyStatsLabel = {
        // fontFamily: "Kumbh Sans",
        fontWeight: "400",
        // color: customColors.darkGray,
        textTransform: "capitalize",
        fontSize: "0.75rem",
        textAlign: "center",
        letterSpacing: "0.1rem"
    };

    const sxDivider = {
        bgcolor: customColors.darkGray,
        opacity: 0.9,
        width: "100%"
    };

    return (
        <Container id="app-container" {...props} >
            <Stack id="app">
                <Stack id="card" sx={{ ...sxCardStack, boxShadow: 3, border: appTheme.palette.mode === 'dark' ? "2px solid #ffffff75" : "" }}>
                    <Stack id="profile" sx={sxProfileStack}>
                        <img src={BgPatternCard} alt="background card profile" />
                        <Avatar alt="Gaurav" src={avatarPath} />
                        <Stack id="profile-text" sx={sxProfileTextStack}>
                            <Typography variant="name" sx={sxTypographyName}>
                                {user[1] && user[1].first_name} {user[1] && user[1].last_name}
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography variant="age" sx={sxTypographyAge}>21</Typography>
                        </Stack>
                        <Typography variant="location" sx={sxTypographyLocation}>{user[1] && user[1].email}</Typography>
                        <Divider id="profile-divider" sx={sxDivider} />
                    </Stack>
                    <Stack id="stats-stack" sx={sxStatsStack}>
                        <Stack id="stats-component" sx={sxStatsComponent}>
                            <Typography variant="stats" sx={sxTypographyStats}>80k</Typography>
                            <Typography variant="statsLabel" sx={sxTypographyStatsLabel}>Followers</Typography>
                        </Stack>
                        <Stack id="stats-component" sx={sxStatsComponent}>
                            <Typography variant="stats" sx={sxTypographyStats}>803k</Typography>
                            <Typography variant="statsLabel" sx={sxTypographyStatsLabel}>Photos</Typography>
                        </Stack>
                        <Stack id="stats-component" sx={sxStatsComponent}>
                            <Typography variant="stats" sx={sxTypographyStats}>4k</Typography>
                            <Typography variant="statsLabel" sx={sxTypographyStatsLabel}>Likes</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}

export default ProfileCard;
