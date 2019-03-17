import {compose} from "@bem-react/core";
import ButtonBase from "./_basis/Button_basis_Button/Button_basis_Button";
import {IClassNameProps} from "@bem-react/core";
import ButtonTypeLink from "./_basis/Button_basis_Link/Button_basis_Link";
import {ButtonThemeFuture} from "./_theme/Button_theme_Future/Button_theme_Future";
import './Button.css';
import {ButtonSizeBig} from "./_size/Button_size_Big/Button_size_Big";
import {ButtonSizeSmall} from "./_size/Button_size_small/Button_size_small";


export interface IButton extends IClassNameProps {
    text?: string;
    type?: string;
    onClick?: () => void;
    className?: string;
    disable?: boolean;

    basis?: 'Link';
    targetUrl?: string;

    size?: 'Small' | 'Big';
    theme?: 'Future';
}

const Button = compose(
    ButtonThemeFuture,
    ButtonSizeBig,
    ButtonSizeSmall,
    ButtonTypeLink
)(ButtonBase);

export default Button;
