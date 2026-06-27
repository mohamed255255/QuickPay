package Main.controller.user;

import Main.Service.UserService;
import Main.model.favourites;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public class FavouriteController {

  private final UserService userService;

  public FavouriteController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/addtofav")
  public ResponseEntity<String> addToFav(@RequestBody favourites favService) {
    return userService.addToFav(favService);
  }

  @GetMapping("/getallfav")
  public List<favourites> getAllFavServices() {
    return userService.getAllFavServices();
  }

  @GetMapping("/checkFavService")
  public ResponseEntity<String> checkFavService(
      @RequestParam("servicename") String servicename, @RequestParam("company") String company) {
    return userService.checkFavService(servicename, company);
  }

  @DeleteMapping("/deletefav")
  public ResponseEntity<String> deleteFavService(@RequestBody favourites favService) {
    return userService.deleteFavService(favService);
  }
}
