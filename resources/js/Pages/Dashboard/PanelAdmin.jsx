import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle';
import { CardAdmin, CardPetugas } from '@/Components/Cards';
import { dataCardsAdmin, dataCardsPetugas } from '@/Components/url/url';

const PanelAdmin = ({ items, user, data_spp }) => {
    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Menu Utama'} subTitle={`Selamat Datang ${user?.level}`} />
            {user.level === 'admin' ? (
                <CardAdmin dataCards={dataCardsAdmin} items={items} />
            ) : (
                <CardPetugas dataCardsPetugas={dataCardsPetugas} dataSpp={data_spp} />
            )}
        </Sidebar>
    )
}

export default PanelAdmin
