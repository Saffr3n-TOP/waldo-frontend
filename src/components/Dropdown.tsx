import { waldoFetch } from '../utils/useFetch';

type DropdownProps = {
  pointData: PointData;
  setPointData: React.Dispatch<React.SetStateAction<PointData | undefined>>;
  polygons: ApiData['polygons'];
  setError: React.Dispatch<React.SetStateAction<ApiError | undefined>>;
  setData: React.Dispatch<React.SetStateAction<ApiData | undefined>>;
  setAlert: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function Dropdown({
  pointData,
  setPointData,
  polygons,
  setError,
  setData,
  setAlert
}: DropdownProps) {
  const x = pointData.clientX - pointData.offsetX;
  const y = pointData.clientY - pointData.offsetY;

  const dropdownStyle = (pointData: PointData) => {
    const { clientX, clientY, windowWidth, windowHeight } = pointData;
    const translateX = clientX > windowWidth / 2 ? '-100%' : '0';
    const translateY = clientY > windowHeight / 2 ? '-100%' : '0';

    return {
      top: clientY,
      left: clientX,
      transform: `translate(${translateX}, ${translateY})`
    };
  };

  const onLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPointData(undefined);

    const link = e.target as HTMLAnchorElement;
    const result = await waldoFetch(`${link.pathname}?point=${x}+${y}`);

    if (result instanceof Error) {
      return setError(result);
    }

    setData(result);
    setAlert(result?.message);
  };

  return (
    <ul style={dropdownStyle(pointData)}>
      {Object.values(polygons!).map(
        (polygon) =>
          !polygon.isFound && (
            <li key={polygon._id}>
              <a href={`/${polygon._id}`} onClick={onLinkClick}>
                {polygon.name}
              </a>
            </li>
          )
      )}
    </ul>
  );
}
