import react, {PropsWithChildren} from "react"
import { Text} from "@radix-ui/themes";


export default function ErrorMessage({ children }: PropsWithChildren) {
    if (!children) null;
    return <Text color="red" as="p">{children}</Text>
  }