import { StyleSheet } from 'react-native';

export const dashboardStyle = StyleSheet.create({
  container: {
    padding: 10,
    width: 'auto',
    height: 'auto',
    flexDirection: 'column',
  },
  pickerContainer: {
    padding: 2,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
  },
  infoContainer: {
    gap: 30,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  infoRowContainer: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  infoTileContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
    width: 'auto',
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'solid',
  },
  infoTitleTitle: {
    fontSize: 24,
    textAlign: 'left',
  },
  infoTileData: {
    fontSize: 16,
    textAlign: 'left',
  },
  addBtn: {
    flex: 1,
    marginVertical: 20,
  },
});
