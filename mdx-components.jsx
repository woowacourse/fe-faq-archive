import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Reveal } from './components/Reveal'

export function useMDXComponents(components) {
  return getDocsMDXComponents({
    Reveal,
    ...components,
  })
}
