import { BottomNav } from "@/components/BottomNav";
import { PortfolioBadge } from "@/components/PortfolioBadge";
import { SiteFooter } from "@/components/SiteFooter";
import { getSettings } from "@/lib/data";
import { waLink } from "@/lib/wa";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <main>{children}</main>
      <SiteFooter settings={settings} />
      <PortfolioBadge />
      <BottomNav waHref={waLink(settings.wa_number, "Halo HasTrans, saya mau tanya travel.")} />
    </>
  );
}
