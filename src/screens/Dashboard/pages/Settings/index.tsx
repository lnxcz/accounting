import { type Component, createSignal } from "solid-js";
import Toolbar from "./components/Toolbar";
import { FiFileText, FiSettings } from "solid-icons/fi";
import { useI18n } from "@/i18n";
import Input from "@/shared/components/Menu/Input";
import Dropdown from "@/shared/components/Menu/Dropdown";
import PageHeader from "../../components/PageHeader";
import HeaderButton from "../../components/PageHeader/HeaderButton";

const Settings: Component = () => {
  const [t] = useI18n();
  const [currentSection, setCurrentSection] = createSignal(0);

  return (
    <>
      <PageHeader
        title={[t("sidebar.button.settings")]}
        actionElements={[
          <HeaderButton buttonType="primary" onClick={() => console.log("clicked")}>
            Save
          </HeaderButton>,
        ]}
      />
      <div class="w-full h-20 gap-2 flex justify-center items-center border-b border-black/20">
        <Toolbar
          text={t("settings.general.title")}
          icon={<FiSettings />}
          active={currentSection() === 0}
          onClick={() => setCurrentSection(0)}
        />
        <Toolbar
          text={t("settings.invoice.title")}
          icon={<FiFileText />}
          active={currentSection() === 1}
          onClick={() => setCurrentSection(1)}
        />
        <Toolbar
          text="Nastavení"
          icon={<FiSettings />}
          active={currentSection() === 2}
          onClick={() => setCurrentSection(2)}
        />
        <Toolbar text="Nastavení" icon={<FiSettings />} />
        <Toolbar text="Nastavení" icon={<FiSettings />} />
        <Toolbar text="Nastavení" icon={<FiSettings />} />
      </div>
      <div class="w-full h-full px-20">
        <Input label="Název" id="name" placeholder="Název" />
        <Dropdown />
      </div>
    </>
  );
};

export default Settings;
