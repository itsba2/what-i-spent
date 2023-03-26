import {
    Restaurant as FoodIcon,
    Groups as SocialLifeIcon,
    AirportShuttle as TransportIcon,
    House as HouseholdIcon,
    Checkroom as ApparelIcon,
    MonitorHeart as HealthIcon,
    School as EducationIcon,
    CardGiftcard as GiftIcon,
    CurrencyExchange as DebtIcon,
    Face as BeautyIcon,
    Palette as CultureIcon,
    SportsHandball as SportsIcon,
    Pets as AnimalsIcon,
    AllInclusive as OtherIcon,
    Paid as SalaryIcon,
    Money as AllowanceIcon,
    AddShoppingCart as BonusIcon,
} from "@mui/icons-material"

const categories = [
    // expense categories
    {
        type: "expense",
        name: "Food",
        icon: <FoodIcon />,
    },
    {
        type: "expense",
        name: "Social Life",
        icon: <SocialLifeIcon />,
    },
    {
        type: "expense",
        name: "Transport",
        icon: <TransportIcon />,
    },
    {
        type: "expense",
        name: "Household",
        icon: <HouseholdIcon />,
    },
    {
        type: "expense",
        name: "Apparel",
        icon: <ApparelIcon />,
    },
    {
        type: "expense",
        name: "Health",
        icon: <HealthIcon />,
    },
    {
        type: "expense",
        name: "Education",
        icon: <EducationIcon />,
    },
    {
        type: "expense",
        name: "Gift",
        icon: <GiftIcon />,
    },
    {
        type: "expense",
        name: "Debt",
        icon: <DebtIcon />,
    },
    {
        type: "expense",
        name: "Beauty",
        icon: <BeautyIcon />,
    },
    {
        type: "expense",
        name: "Culture",
        icon: <CultureIcon />,
    },
    {
        type: "expense",
        name: "Sports",
        icon: <SportsIcon />,
    },
    {
        type: "expense",
        name: "Animals",
        icon: <AnimalsIcon />,
    },
    {
        type: "expense",
        name: "Other",
        icon: <OtherIcon />,
    },
    {
        type: "earning",
        name: "Salary",
        icon: <SalaryIcon />,
    },
    {
        type: "earning",
        name: "Allowance",
        icon: <AllowanceIcon />,
    },
    {
        type: "earning",
        name: "Bonus",
        icon: <BonusIcon />,
    },
    {
        type: "earning",
        name: "Other",
        icon: <OtherIcon />,
    },
]

export default categories
