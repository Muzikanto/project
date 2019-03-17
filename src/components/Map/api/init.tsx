declare const ymaps: any;

interface IMap {
    [key: string]: any;
}

const CreateMap = (containerId: any, callback: (map: any) => void) => {
    ymaps.ready(() => {
        const myMap = new ymaps.Map(containerId, {
            center: [55.76, 37.64],
            controls: [],
            zoom: 10
        });

        const objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 64,
            clusterIconLayout: 'default#pieChart',
            clusterDisableClickZoom: false,
            geoObjectOpenBalloonOnClick: false,
            geoObjectHideIconOnBalloonOpen: false
        });

        objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

        callback(myMap);
    });
};

export {CreateMap, IMap, ymaps};
