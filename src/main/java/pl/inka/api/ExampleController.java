package pl.inka.api;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.inka.api.model.Tick;

@RestController
@Transactional
public class ExampleController {

  @PersistenceContext
  private EntityManager entityManager;



  @GetMapping("/")
  public String hello() {
    return "Hello from the inka backend";
  }

  @GetMapping("/tick")
  public Integer getTick() {
    return entityManager.find(Tick.class, 1).getValue();
  }

  @PostMapping("/tick")
  public void increaseTick() {
    Tick tick = entityManager.find(Tick.class, 1);
    tick.setValue(tick.getValue() + 1);
    entityManager.merge(tick);
  }

}
