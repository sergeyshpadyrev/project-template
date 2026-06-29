import type { JSX } from 'react';

export const createComponent =
  <Input, Logic, Style>({
    useLogic,
    useRender,
    useStyle,
  }: {
    useLogic: (props: Input) => Logic;
    useRender: (props: Input, logic: Logic, styles: Style) => JSX.Element | null;
    useStyle: (props: Input, logic: Logic) => Style;
  }) =>
  (input: Input) => {
    const logic = useLogic(input);
    const styles = useStyle(input, logic);
    return useRender(input, logic, styles);
  };
