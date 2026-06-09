import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * Link — обёртка над next/link с включённым prefetch.
 * Предзагружает страницу при наведении/появлении во viewport — переход мгновенный.
 */
export function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} prefetch={true} />;
}
