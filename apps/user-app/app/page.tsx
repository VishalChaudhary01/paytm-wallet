import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="text-3xl font-bold">
      Hi There, from user-app
      <Button appName="Button">Button</Button>
    </div>
  );
}
