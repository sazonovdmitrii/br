import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { Filter as FilterIcon, Search as SearchIcon, X as CloseIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { Tabs, Tab, TabsView } from 'components/Tabs';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Filters = ({ list, count, onChange }) => {
    const [tab, setTab] = useState({
        value: null,
        active: false,
    });
    const [tagsIds, setTagsIds] = useState([]);
    const handleChangeTab = newValue => {
        setTab(prevState => ({
            ...prevState,
            value: tab.value === newValue ? null : newValue,
            active: tab.value !== newValue,
        }));
    };
    const handleChangeFilter = (tagId, active) => {
        setTagsIds(prevState => {
            const newTagsIds = active ? [...prevState, tagId] : prevState.filter(id => id !== tagId);
            onChange(newTagsIds);

            return newTagsIds;
        });
    };
    const resetFilters = () => {
        setTagsIds([]);
        onChange([]);
    };

    const tabWrapperClassName = cx(styles.tabWrapper, { active: tab.active });
    const innerClassName = cx(styles.inner, { active: tab.active });
    const wrapperClassName = cx(styles.wrapper, { expanded: tab.active });
    const modalClassName = cx(styles.modal, { expanded: tab.active });
    const tabsClassName = cx(styles.tabs, { expanded: tab.active });
    const buttonsClassName = cx(styles.buttons, { expanded: tab.active });

    return (
        <div className={wrapperClassName}>
            <div className={modalClassName}>
                <h2 className={styles.modalHeader}>
                    <FormattedMessage id="p_catalog_filters_modal_header" />
                </h2>
                <button
                    type="button"
                    className={styles.modalClose}
                    onClick={() => setTab({ value: null, active: false })}
                >
                    <CloseIcon />
                </button>
                <div className={styles.modalFooter}>
                    <button type="button" className={styles.resetButton} onClick={() => setTagsIds([])}>
                        <FormattedMessage
                            id="p_catalog_filters_modal_reset_button"
                            values={{ count: tagsIds.length }}
                        />
                    </button>
                    <Button className={styles.modalButton} kind="simple">
                        <FormattedMessage id="p_catalog_filters_modal_button" values={{ count }} />
                    </Button>
                </div>
            </div>
            <div className={innerClassName}>
                {list.length ? (
                    <Tabs className={tabsClassName} value={tab.value} onChange={handleChangeTab}>
                        {list.map(item => {
                            if (!item.childrens.length) return null;

                            const tabClassName = cx(styles.tab, {
                                active: tab.value ? tab.value === item.id : true,
                                inactive: tab.value !== item.id,
                            });

                            return (
                                <Tab
                                    key={item.id}
                                    className={tabClassName}
                                    value={item.id}
                                    data-name={item.name}
                                >
                                    {item.name}
                                </Tab>
                            );
                        })}
                    </Tabs>
                ) : null}
                {list.length ? (
                    <div className={tabWrapperClassName}>
                        {list.map(item => {
                            if (!item.childrens.length) return null;

                            const tabContentClassName = cx(styles.tabContent, {
                                active: item.id === tab.value,
                            });

                            return (
                                <TabsView key={item.id} value={tab.value} className={tabContentClassName}>
                                    <div className={styles.tabContentItems}>
                                        {item.childrens.map(({ name, id }) => {
                                            if (!name) return null;

                                            return (
                                                <div key={id} className={styles.filterItem}>
                                                    <Checkbox
                                                        label={name}
                                                        name={id}
                                                        onChange={(e, value) => handleChangeFilter(id, value)}
                                                        checked={tagsIds.indexOf(id) !== -1}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </TabsView>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <div className={buttonsClassName}>
                <Button
                    className={styles.button}
                    kind="simple"
                    onClick={() => setTab({ active: true, value: list[0].id })}
                >
                    <FilterIcon size="15" className={styles.buttonIcon} />
                    <FormattedMessage id="p_catalog_filters_button" />
                </Button>
                {/* <Button className={styles.button} kind="simple">
                    <SearchIcon size="15" className={styles.buttonIcon} />
                    Search frames
                </Button> */}
            </div>
        </div>
    );
};

export default Filters;
