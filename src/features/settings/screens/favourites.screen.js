import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { styled } from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

const NoFavouritesArea = styled(SafeArea)`
  alignitems: "center";
  justifycontent: "center";
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Restaurants", {
                screen: "RestaurantDetail",
                params: {
                  restaurant: item,
                },
              })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.placeId}
        // contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text variant="body">No favourites yet</Text>
    </NoFavouritesArea>
  );
};
