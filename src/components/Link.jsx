import React from 'react';
import { Link } from 'react-router-dom';

const LinkUrl = ({children, handleClick, link, clases}) => <Link  className={clases} to={link}> {children} </Link>;
export default LinkUrl;