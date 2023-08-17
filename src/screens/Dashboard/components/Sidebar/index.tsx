import { Component, Show, createSignal } from "solid-js";
import SidebarButton from "./Button";
import SidebarSection from "./Section";
import { useSelector } from "@/store";
import { useI18n } from "@/i18n";
import Popover from "@/shared/components/Popover";
//@ts-expect-error
import { Presence } from "@motionone/solid";
import { FiSettings } from "solid-icons/fi";

const Sidebar: Component = () => {
  const [t] = useI18n();
  const [settingsOpen, setSettingsOpen] = createSignal(false);

  const {
    companyService: { company },
  } = useSelector();

  return (
    <div class="flex relative flex-col justify-between px-4 pt-14 pb-4 w-1/5 h-screen lg:max-w-[220px] min-w-[140px] bg-gray-400 shrink-0">
      <div>
        <SidebarButton target="/">{t.sidebar_button_overview()}</SidebarButton>

        <SidebarSection title={t.sidebar_section_sales()}>
          <SidebarButton target="sales/invoices">{t.sidebar_button_invoices()}</SidebarButton>
        </SidebarSection>
        <SidebarSection title={t.sidebar_section_purchase()}>
          <SidebarButton target="/purchase/expenses">{t.sidebar_button_expenses()}</SidebarButton>
        </SidebarSection>

        <SidebarSection title={t.sidebar_section_directory()}>
          <SidebarButton target="/directory/clients">{t.sidebar_button_clients()}</SidebarButton>
        </SidebarSection>
      </div>

      {/* profile  */}
      <div class="flex flex-row gap-3 justify-start items-center lg:gap-4">
        <div class="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full lg:w-10 lg:h-10">
          <FiSettings />
        </div>
        <div class="flex flex-col">
          <span class="text-sm leading-3 lg:text-md lg:leading-5 lg:text-base">{company.name}</span>
          <span class="text-sm text-gray-700">{company.email}</span>
        </div>
      </div>

      <Presence exitBeforeEnter>
        <Show when={settingsOpen()}>
          <Popover onClose={() => setSettingsOpen} title="Settings">
            Nastaveni
          </Popover>
        </Show>
      </Presence>
    </div>
  );
};

export default Sidebar;
