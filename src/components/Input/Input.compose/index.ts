import {compose} from "@bem-react/core";
import InputTypeWithLabel from "../_bemType/Input_type_withLabel/Input_type_withLabel";
import InputTypeBase from "../_bemType/Input_type_base/Input_type_base";
import {IInputProps} from "../Input.typings";


const ComposedInput = compose<IInputProps>(
    InputTypeWithLabel
)(InputTypeBase);

export {
    ComposedInput
}
