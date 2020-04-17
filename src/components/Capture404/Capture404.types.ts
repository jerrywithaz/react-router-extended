export type Capture404ComponentProps = {
  is404: boolean;
};

export type Capture404Props = {
  FoundComponent: React.ComponentType<Capture404ComponentProps>;
  NotFoundComponent: React.ComponentType<Capture404ComponentProps>;
};
