import React, { useEffect } from "react";
import Icon from "../../assets/GearSix.svg";
import localeTexts from "../../common/locales/en-us/index";
import parse from "html-react-parser";
import styles from "./AppConfiguration.module.css";
import { useInstallationData } from "../../common/hooks/useInstallationData";
import { useAppConfig } from "../../common/hooks/useAppConfig";
import Tooltip from "../Tooltip/Tooltip";

const AppConfigurationExtension: React.FC = () => {
  const { installationData, setInstallationData } = useInstallationData();
  const appConfig = useAppConfig();

  const updateConfig = async (elem: any) => {
    console.log(elem?.target);
    if (typeof setInstallationData !== "undefined") {
      await setInstallationData({
        configuration: {
          openAIOrganization: elem?.target.id.includes("openAIOrganization")
            ? elem.target.value
            : appConfig?.openAIOrganization || "",
          openAIAPIKey: elem?.target.id.includes("openAIAPIKey") ? elem.target.value : appConfig?.openAIAPIKey || "",
        },
        serverConfiguration: {},
      });
    }
  };

  useEffect(() => {
    updateConfig(null);
  }, [appConfig]);

  return (
    <div className={`${styles.layoutContainer}`}>
      <div className={`${styles.appConfig}`}>
        <div className={`${styles.appConfigLogoContainer}`}>
          <img src={Icon} alt="icon" />
          <p>{localeTexts.ConfigScreen.title}</p>
        </div>

        <div className={`${styles.configWrapper}`}>
          <div className={`${styles.configContainer}`}>
            <div className={`${styles.infoContainerWrapper}`}>
              <div className={`${styles.infoContainer}`}>
                <div className={`${styles.labelWrapper}`}>
                  <label htmlFor="appConfigData">OpenAI Organization Key</label>
                  <Tooltip content="You can save this field for information such as Username, Email, Number, Date, etc." />
                </div>
              </div>
              <div className={`${styles.inputContainer}`}>
                <input
                  type="text"
                  required
                  value={installationData.configuration.openAIOrganization}
                  placeholder="Enter Field Value"
                  id="openAIOrganizationField"
                  autoComplete="off"
                  className={`${styles.fieldInput}`}
                  onChange={updateConfig}></input>
              </div>
            </div>
            <br />
            <div className={`${styles.infoContainerWrapper}`}>
              <div className={`${styles.infoContainer}`}>
                <div className={`${styles.labelWrapper}`}>
                  <label htmlFor="appConfigData">OpenAI API Key</label>
                  <Tooltip content="You can save this field for information such as Username, Email, Number, Date, etc." />
                </div>
              </div>
              <div className={`${styles.inputContainer}`}>
                <input
                  type="text"
                  required
                  value={installationData.configuration.openAIAPIKey}
                  placeholder="Enter Field Value"
                  id="openAIAPIKeyField"
                  autoComplete="off"
                  className={`${styles.fieldInput}`}
                  onChange={updateConfig}></input>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.locationDescription}`}>
          <p className={`${styles.locationDescriptionText}`}>{parse(localeTexts.ConfigScreen.body)}</p>
          <a target="_blank" rel="noreferrer" href={localeTexts.ConfigScreen.button.url}>
            <span className={`${styles.locationDescriptionLink}`}>{localeTexts.ConfigScreen.button.text}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationExtension;
