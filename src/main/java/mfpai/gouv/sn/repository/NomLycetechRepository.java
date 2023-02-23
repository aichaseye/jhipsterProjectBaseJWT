package mfpai.gouv.sn.repository;

import mfpai.gouv.sn.domain.NomLycetech;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NomLycetech entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NomLycetechRepository extends JpaRepository<NomLycetech, Long> {}
