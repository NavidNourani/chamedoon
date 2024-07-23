import { LinkProps, Link as MUILink } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";
type Props = LinkProps;

const Link: FC<Props> = (props) => {
  return <MUILink component={NextLink} {...props} />;
};

export default Link;
